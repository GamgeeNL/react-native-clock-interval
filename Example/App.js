/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import TimeInterval from './TimeInterval';
import ClockFace from './ClockFace';

const pad = num => (num < 10 ? `0${num}` : num);
const formatTime = ({hour, minute}) => `${pad(hour)}:${pad(minute)}`;

const App = () => {
  const [appliedTime, setAppliedTime] = React.useState({
    start: {
      hour: 22,
      minute: 0,
    },
    stop: {
      hour: 7,
      minute: 0,
    },
  });
  const [indicatorTime, setIndicatorTime] = React.useState(appliedTime);

  const onChange = React.useCallback(
    (start, stop) => setIndicatorTime({start, stop}),
    [],
  );

  const onRelease = React.useCallback(
    (start, stop) => setAppliedTime({start, stop}),
    [],
  );

  const Indicator = ({stop = false}) => (
    <View style={styles.indicatorWrapper}>
      <View style={[styles.indicator, stop && styles.indicatorStop]} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.layer}>
          <ClockFace size={200} />
        </View>
        <View style={styles.layer}>
          <Text>{formatTime(indicatorTime.start)}</Text>
          <Text>{formatTime(indicatorTime.stop)}</Text>
        </View>

        <TimeInterval
          start={appliedTime.start}
          stop={appliedTime.stop}
          step={5}
          onChange={onChange}
          onRelease={onRelease}
          componentSize={300}
          indicatorSize={70}
          lineWidth={40}
          lineColor={['yellow', 'gold']}
          startIndicator={() => <Indicator />}
          stopIndicator={() => <Indicator stop />}
          allowLineDrag
        />
      </View>

      <View style={styles.appliedTime}>
        <Text>{formatTime(appliedTime.start)}</Text>
        <Text>{formatTime(appliedTime.stop)}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  layer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  indicatorWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    width: 40,
    height: 40,
    borderWidth: 5,
    borderRadius: 40,
    borderColor: 'yellow',
    backgroundColor: 'black',
  },
  indicatorStop: {
    borderColor: 'gold',
  },
  appliedTime: {
    width: 250,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 30,
  },
});

export default App;
