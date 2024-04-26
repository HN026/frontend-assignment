import React, { useEffect, useState, useRef, useCallback } from 'react';
import { MimicLogs } from './api-mimic.js';
import { useContext } from 'react';
import { SelectedOptionContext } from '../App.js';
import MaxWidthWrapper from './Wrapper.js';

function Logs() {
    const { selectedOption: { value } } = useContext(SelectedOptionContext);
    console.log(value);
    const [logs, setLogs] = useState([]);
    const [isLive, setIsLive] = useState(true);
    const logsContainerRef = useRef(null);
    const endRef = useRef(null);
    const [newLogsCount, setNewLogsCount] = useState(0);
    const isAtBottomRef = useRef(true);


    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()} ${date.toLocaleTimeString()}`;
    };

    const formatLogLevel = (logLevel) => {
        const logLevels = ['info', 'success', 'error'];
        return logLevels[logLevel % logLevels.length];
    };

    const getLogLevelColor = (logLevel) => {
        const logLevelColors = {
            'info': 'grey',
            'success': 'green',
            'error': 'red',
        };
        return logLevelColors[logLevel];
    };

    const fetchMoreLogs = useCallback(() => {
        const startTs = logs[0].timestamp - 60000;
        MimicLogs.fetchPreviousLogs({ startTs, endTs: logs[0].timestamp, limit: 10 })
            .then(fetchedLogs => {
                setLogs(prevLogs => [...fetchedLogs, ...prevLogs]);
            });
    }, [logs]);

    useEffect(() => {
        let unsubscribe;

        if (value === 'live') {
            setIsLive(true);
            unsubscribe = MimicLogs.subscribeToLiveLogs((newLog) => {
                if (isAtBottomRef.current) {
                    setLogs((prevLogs) => [...prevLogs, newLog]);
                    if (endRef.current) {
                        endRef.current.scrollIntoView({ behavior: 'smooth' });
                    }
                }
                else {
                    setNewLogsCount((prevCount) => prevCount + 1);
                }
            });
        } else {
            setIsLive(false);
            const endTime = new Date();
            const startTime = new Date(endTime.getTime() - value * 60 * 1000);
            MimicLogs.fetchPreviousLogs({ startTs: startTime.getTime(), endTs: endTime.getTime(), limit: value * 2 })
                .then(fetchedLogs => setLogs(fetchedLogs));
        }

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [value]);

    useEffect(() => {
        const handleScroll = (e) => {
            const threshold = 30;
            isAtBottomRef.current = e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight < threshold;
            if (e.target.scrollTop === 0) {
                fetchMoreLogs();
            }
        };

        const logsContainer = logsContainerRef.current;
        logsContainer.addEventListener('scroll', handleScroll);

        return () => {
            logsContainer.removeEventListener('scroll', handleScroll);
        };
    }, [fetchMoreLogs]);

    useEffect(() => {
        if (endRef.current && isAtBottomRef.current) {
            endRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [logs]);

    const scrollToBottom = () => {
        if (endRef.current) {
            endRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        setNewLogsCount(0);
    };

    return (
        <MaxWidthWrapper>
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', width: '100%', paddingRight: '1rem' }}>
                <p className='p-3' style={{ color: '#59739e', right: '0', margin: '15px', marginBottom: '0', borderRadius: '10px', backgroundColor: '#fff', zIndex: '100', display: 'flex', justifyContent: 'right', alignItems: 'center', width: '98%', fontSize: '14px' }}>
                    {isLive ? '' : `Showing logs from ${formatTimestamp(new Date(Date.now() - value * 60 * 1000))} -> ${formatTimestamp(new Date())}`}
                </p>
                <div ref={logsContainerRef} className='p-3' style={{
                    backgroundColor: '#060021', fontFamily: 'Courier New, monospace', minHeight: '80vh', maxHeight: '80vh', overflowY: 'scroll', margin: '20px', marginTop: '0', borderRadius: '10px', position: 'relative', scrollbarWidth: 'none',
                }}>
                    <div style={{
                        position: 'absolute',
                        bottom: '0',
                        right: '0',
                        width: '100%',
                        height: 'calc(100% - 40px)',
                        pointerEvents: 'none',
                    }}>
                    </div>
                    {logs.map((log, index) => {
                        const logLevel = formatLogLevel(index);
                        const limitedMessage = log.message.substring(0, 100);
                        return (
                            <div key={index} ref={index === logs.length - 1 ? endRef : null}>
                                <p style={{ fontSize: '0.8rem', color: '#7cbacf' }}>
                                    <span style={{ color: getLogLevelColor(logLevel) }}>| </span>
                                    {formatTimestamp(log.timestamp)}
                                    <span style={{ color: getLogLevelColor(logLevel) }}> [{logLevel}] </span>
                                    {limitedMessage}
                                </p>
                            </div>
                        );
                    })}
                </div>
                {newLogsCount > 0 && !isAtBottomRef.current && (
                    <div style={{ position: 'absolute', bottom: '30px', right: '48px', display: 'flex', justifyContent: 'flex-end' }}>
                        <button onClick={scrollToBottom} style={{ borderRadius: '5px', padding: '10px', backgroundColor: '#5e03fc', color: 'white', display: 'flex', alignItems: 'center' }}>
                            {newLogsCount} new logs
                            <img src={`${process.env.PUBLIC_URL}/arrow-up-long.png`} alt="Arrow Down" style={{ marginLeft: '10px', height: '15px' }} />
                        </button>
                    </div>
                )}
            </div>
        </MaxWidthWrapper>
    );
}

export default Logs;