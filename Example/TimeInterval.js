/**
 * Time Interval Picker.
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, PanResponder, Animated } from 'react-native';
import {
  Surface,
  Shape,
  Path,
  LinearGradient,
} from '@react-native-community/art';
import TinyColor from 'tinycolor2';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dragged: {
    backgroundColor: 'transparent',
    position: 'absolute',
  },
  arc: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

const pointDistance = (x, y) => Math.sqrt(x * x + y * y);
const distanceBetweenPoints = (a, b) =>
  Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
const DAY_MINS = 24 * 60;
const timeDistance = (a, b) => {
  const aMins = a.hour * 60 + a.minute;
  const bMins = b.hour * 60 + b.minute;
  return Math.min(
    Math.abs(aMins - bMins),
    Math.abs(aMins + DAY_MINS - bMins),
    Math.abs(aMins - DAY_MINS - bMins),
  );
};
const turnTime = ({ hour, minute }, diffMinutes, previous) => {
  const result = {};
  result.minute = (minute + diffMinutes) % 60;
  if (result.minute < 0) {
    result.minute += 60;
  }
  const surplusHours = Math.floor((minute + diffMinutes) / 60);
  result.hour = (hour + surplusHours) % 12;
  if (result.hour < 0) {
    result.hour += 12;
  }

  if (
    timeDistance(result, previous) >
    timeDistance({ hour: result.hour + 12, minute: result.minute }, previous)
  ) {
    result.hour += 12;
  }
  return result;
};
const createPanResponder = (
  animatedPositionValue,
  getActualPosition,
  onRelease,
) =>
  PanResponder.create({
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderGrant: () => {
      animatedPositionValue.setOffset(getActualPosition());
      animatedPositionValue.setValue({ x: 0, y: 0 });
    },
    onPanResponderMove: Animated.event([
      null,
      { dx: animatedPositionValue.x, dy: animatedPositionValue.y },
    ]),
    onPanResponderRelease: () => {
      onRelease();
    },
  });

const updateFilter = (handler, parser) => {
  let updates = [];
  return value => {
    updates.push(parser ? parser(value) : value);
    requestAnimationFrame(() => {
      if (!updates.length) {
        return;
      }
      const val = updates.pop();
      updates = [];
      handler(val);
    });
  };
};

/**
 * Time Interval Picker component.
 * @class TimeInterval
 * @extends PureComponent
 */
export default class TimeInterval extends PureComponent {
  static propTypes = {
    start: PropTypes.shape({
      hour: PropTypes.number.isRequired,
      minute: PropTypes.number.isRequired,
    }).isRequired,
    stop: PropTypes.shape({
      hour: PropTypes.number.isRequired,
      minute: PropTypes.number.isRequired,
    }).isRequired,
    step: PropTypes.number,
    onChange: PropTypes.func,
    onRelease: PropTypes.func.isRequired,
    componentSize: PropTypes.number.isRequired,
    indicatorSize: PropTypes.number.isRequired,
    lineWidth: PropTypes.number.isRequired,
    lineColor: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]).isRequired,
    startIndicator: PropTypes.func.isRequired,
    stopIndicator: PropTypes.func.isRequired,
    allowLineDrag: PropTypes.bool,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    step: 1,
    onChange: null,
    allowLineDrag: true,
    disabled: false,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs Setup
   */
  constructor(props) {
    super(props);
    this.dragPositionToIndicatorPosition = this.dragPositionToIndicatorPosition.bind(
      this,
    );
    this.indicatorPositionToTime = this.indicatorPositionToTime.bind(this);
    this.timeToindicatorPosition = this.timeToindicatorPosition.bind(this);
    this.positionToLinePosition = this.positionToLinePosition.bind(this);
    this.updateArc = this.updateArc.bind(this);
    this.updateIndicators = this.updateIndicators.bind(this);
    this.reportUpdate = this.reportUpdate.bind(this);

    const setTimes = { start: props.start, stop: props.stop };
    this.state = {
      ...setTimes,
      setTimes,
      startPosition: { x: 0, y: 0 },
      stopPosition: { x: 0, y: 0 },
    };
    this.lastReportedStart = {};
    this.lastReportedStop = {};

    const dragHandler = (stateTimeValue, setImagePosition) =>
      updateFilter(value => {
        const imagePos = this.dragPositionToIndicatorPosition(value);
        if (!imagePos) {
          return;
        }

        const time = this.indicatorPositionToTime(value);
        const enabled = setImagePosition(this.timeToindicatorPosition(time));
        if (!enabled) {
          return;
        }

        this.setState(state => {
          const previous = state[stateTimeValue];
          if (
            timeDistance(time, previous) >
            timeDistance(
              { hour: time.hour + 12, minute: time.minute },
              previous,
            )
          ) {
            time.hour += 12;
            time.hour %= 24;
          }
          const result = {};
          result[stateTimeValue] = time;
          if (this.props.onChange) {
            const vals = {
              start: state.start,
              stop: state.stop,
              ...result,
            };
            this.reportUpdate(vals.start, vals.stop);
          }
          return result;
        });
      });

    this.startDragPosition = new Animated.ValueXY();
    this.startImagePosition = new Animated.ValueXY();
    this.stopDragPosition = new Animated.ValueXY();
    this.stopImagePosition = new Animated.ValueXY();

    let startPanEnabled = false;
    this.startPanResponder = createPanResponder(
      this.startDragPosition,
      () => {
        startPanEnabled = true;
        return this.state.startPosition;
      },
      () => {
        startPanEnabled = false;
        this.props.onRelease(this.state.start, this.state.stop);
      },
    );
    this.startDragPosition.addListener(
      dragHandler('start', startPosition => {
        if (!startPanEnabled) {
          return false;
        }
        this.startImagePosition.setValue(startPosition);
        this.setState({ startPosition });
        return true;
      }),
    );

    let stopPanEnabled = false;
    this.stopPanResponder = createPanResponder(
      this.stopDragPosition,
      () => {
        stopPanEnabled = true;
        return this.state.stopPosition;
      },
      () => {
        stopPanEnabled = false;
        this.props.onRelease(this.state.start, this.state.stop);
      },
    );
    this.stopDragPosition.addListener(
      dragHandler('stop', stopPosition => {
        if (!stopPanEnabled) {
          return false;
        }
        this.stopImagePosition.setValue(stopPosition);
        this.setState({ stopPosition });
        return true;
      }),
    );

    this.turningPanResponder = PanResponder.create({
      // filter touch events outside arc line
      onStartShouldSetPanResponderCapture: (
        { nativeEvent: { locationX, locationY } },
        { dx, dy },
      ) => {
        const { allowLineDrag, disabled } = this.props;
        if (!allowLineDrag || disabled) {
          return false;
        }

        const x = locationX - dx;
        const y = locationY - dy;
        if (
          this.lastTurningCapture &&
          this.lastTurningCapture.x === x &&
          this.lastTurningCapture.y === y
        ) {
          // drop previously requested
          return false;
        }
        this.lastTurningCapture = { x, y };

        // drop touches not in the distance of arc line
        const { componentSize, indicatorSize, lineWidth } = this.props;
        const componentRadius = componentSize / 2;
        const distance = pointDistance(
          x - componentRadius,
          y - componentRadius,
        );
        if (
          distance > componentRadius - indicatorSize / 2 + lineWidth / 2 ||
          distance < componentRadius - indicatorSize / 2 - lineWidth / 2
        ) {
          return false;
        }

        // accept touches inside active hours
        const time = this.indicatorPositionToTime({ x, y });
        const startMinutes =
          (this.state.start.hour % 12) * 60 + this.state.start.minute;
        const stopMinutes =
          (this.state.stop.hour % 12) * 60 + this.state.stop.minute;
        const minutes = time.hour * 60 + time.minute;
        if (
          (startMinutes < stopMinutes &&
            minutes <= stopMinutes &&
            minutes >= startMinutes) ||
          (startMinutes > stopMinutes &&
            (minutes <= stopMinutes || minutes >= startMinutes))
        ) {
          return true;
        }

        return false;
      },

      onPanResponderGrant: ({ nativeEvent: { pageX, pageY } }) => {
        const { hour, minute } = this.indicatorPositionToTime(
          this.lastTurningCapture,
        );
        this.turningTimeOffset = {
          minutes: hour * 60 + minute,
          start: this.state.start,
          stop: this.state.stop,
          pageX: pageX - this.lastTurningCapture.x,
          pageY: pageY - this.lastTurningCapture.y,
        };
      },
      onPanResponderMove: updateFilter(
        ({ pageX, pageY }) => {
          if (!this.turningTimeOffset) {
            return;
          }

          const x = pageX - this.turningTimeOffset.pageX;
          const y = pageY - this.turningTimeOffset.pageY;

          const { hour, minute } = this.indicatorPositionToTime({ x, y });
          const { minutes, start, stop } = this.turningTimeOffset;
          const diff = hour * 60 + minute - minutes;
          const state = {
            start: turnTime(start, diff, this.state.start),
            stop: turnTime(stop, diff, this.state.stop),
          };
          this.updateIndicators(state);
          this.setState(state);
        },
        ({ nativeEvent: { pageX, pageY } }) => ({ pageX, pageY }),
      ),
      onPanResponderRelease: () => {
        this.lastTurningCapture = null;
        this.turningTimeOffset = null;
        this.props.onRelease(this.state.start, this.state.stop);
      },
    });
  }

  /**
   * @returns {undefined}
   */
  componentDidMount() {
    this.updateIndicators(this.state);
  }

  /**
   * @param {Object} prevProps Old properties
   * @returns {undefined}
   */
  componentDidUpdate(prevProps) {
    const { start, stop } = this.props;
    if (
      start.hour !== prevProps.start.hour ||
      start.minute !== prevProps.start.minute ||
      stop.hour !== prevProps.stop.hour ||
      stop.minute !== prevProps.stop.minute
    ) {
      this.updateIndicators({ start, stop });
    }
  }

  /**
   * Get derived state from properties
   * @param {*} nextProps New props
   * @param {*} prevState Current state
   * @returns {object} new state
   */
  static getDerivedStateFromProps({ start, stop }, state) {
    if (
      start.hour !== state.setTimes.start.hour ||
      start.minute !== state.setTimes.start.minute ||
      stop.hour !== state.setTimes.stop.hour ||
      stop.minute !== state.setTimes.stop.minute
    ) {
      return { start, stop, setTimes: { start, stop } };
    }

    return null;
  }

  /**
   * @param {Object} dragPosition Relative position of the touch
   * @returns {Object} indicator position
   */
  dragPositionToIndicatorPosition(dragPosition) {
    const { componentSize, indicatorSize } = this.props;
    const componentRadius = componentSize / 2;
    const indicatorRadius = indicatorSize / 2;
    const x = dragPosition.x + indicatorRadius - componentRadius;
    const y = dragPosition.y + indicatorRadius - componentRadius;
    const ratio = pointDistance(x, y) / (componentRadius - indicatorRadius);
    if (ratio > 0.2 && ratio < 2) {
      return {
        x: x / ratio + componentRadius - indicatorRadius,
        y: y / ratio + componentRadius - indicatorRadius,
      };
    }
    return null;
  }

  /**
   * @param {Object} indicatorPosition Relative position of the indicator
   * @returns {Object} Hours, minutes on the clock
   */
  indicatorPositionToTime(indicatorPosition) {
    const { componentSize, indicatorSize, step } = this.props;
    const componentRadius = componentSize / 2;
    const indicatorRadius = indicatorSize / 2;
    const x = indicatorPosition.x + indicatorRadius - componentRadius;
    const y = indicatorPosition.y + indicatorRadius - componentRadius;
    let hours;
    if (!x) {
      hours = y > 0 ? 6 : 0;
    } else {
      hours = (1 + (2 * Math.atan(y / x)) / Math.PI) * 3;
      hours = x > 0 ? hours : 6 + hours;
    }
    const minutes = Math.round((hours * 60) / step) * step;
    return { hour: Math.floor(minutes / 60), minute: minutes % 60 };
  }

  /**
   * @param {Object} time Clock time
   * @returns {Object} indicator position
   */
  timeToindicatorPosition({ hour, minute }) {
    const { componentSize, indicatorSize } = this.props;
    const radius = componentSize / 2 - indicatorSize / 2;
    const time = hour * 60 + minute;
    const x = Math.sin((4 * Math.PI * time) / DAY_MINS) * radius;
    const y = Math.cos((4 * Math.PI * time) / DAY_MINS) * radius;
    return {
      x: x + componentSize / 2 - indicatorSize / 2,
      y: componentSize / 2 - indicatorSize / 2 - y,
    };
  }

  /**
   * @param {Object} position Relative position of the point
   * @param {boolean} out Inidicator of outer/inner point
   * @returns {Object} line position
   */
  positionToLinePosition(position, out = true) {
    const { componentSize, indicatorSize, lineWidth } = this.props;
    const componentRadius = componentSize / 2;
    const x = position.x - componentRadius;
    const y = position.y - componentRadius;
    const ratio =
      pointDistance(x, y) /
      (componentRadius -
        indicatorSize / 2 +
        (out ? lineWidth / 2 : -lineWidth / 2));
    return {
      x: x / ratio + componentRadius,
      y: y / ratio + componentRadius,
    };
  }

  /**
   * @returns {Array} ART Path instances
   */
  updateArc() {
    const { componentSize, indicatorSize, lineWidth, lineColor } = this.props;
    const { start, stop, startPosition, stopPosition } = this.state;

    const SIDE = {
      TOP: {
        in: {
          x: componentSize / 2,
          y: indicatorSize / 2 + lineWidth / 2,
        },
        out: {
          x: componentSize / 2,
          y: indicatorSize / 2 - lineWidth / 2,
        },
      },
      RIGHT: {
        in: {
          x: componentSize - indicatorSize / 2 - lineWidth / 2,
          y: componentSize / 2,
        },
        out: {
          x: componentSize - indicatorSize / 2 + lineWidth / 2,
          y: componentSize / 2,
        },
      },
      BOTTOM: {
        in: {
          x: componentSize / 2,
          y: componentSize - indicatorSize / 2 - lineWidth / 2,
        },
        out: {
          x: componentSize / 2,
          y: componentSize - indicatorSize / 2 + lineWidth / 2,
        },
      },
      LEFT: {
        in: {
          x: indicatorSize / 2 + lineWidth / 2,
          y: componentSize / 2,
        },
        out: {
          x: indicatorSize / 2 - lineWidth / 2,
          y: componentSize / 2,
        },
      },
    };
    const getNearestSide = ({ hour }) => {
      const clockHour = hour % 12;
      if (clockHour < 3) {
        return SIDE.RIGHT;
      }
      if (clockHour < 6) {
        return SIDE.BOTTOM;
      }
      if (clockHour < 9) {
        return SIDE.LEFT;
      }
      return SIDE.TOP;
    };
    const getNextSide = side => {
      switch (side) {
        case SIDE.TOP:
          return SIDE.RIGHT;
        case SIDE.RIGHT:
          return SIDE.BOTTOM;
        case SIDE.BOTTOM:
          return SIDE.LEFT;
        default:
          return SIDE.TOP;
      }
    };

    const sides = [];
    {
      let side = getNearestSide(start);
      if (side === getNearestSide(stop)) {
        const startClockMinutes = (start.hour % 12) * 60 + start.minute;
        const stopClockMinutes = (stop.hour % 12) * 60 + stop.minute;
        if (startClockMinutes === stopClockMinutes) {
          return [];
        }
        if (startClockMinutes > stopClockMinutes) {
          for (let i = 0; i < 4; i += 1) {
            sides.push(side);
            side = getNextSide(side);
          }
        }
      } else {
        while (side !== getNearestSide(stop)) {
          sides.push(side);
          side = getNextSide(side);
        }
      }
    }

    const arcStart = {
      in: this.positionToLinePosition(
        {
          x: startPosition.x + indicatorSize / 2,
          y: startPosition.y + indicatorSize / 2,
        },
        false,
      ),
      out: this.positionToLinePosition(
        {
          x: startPosition.x + indicatorSize / 2,
          y: startPosition.y + indicatorSize / 2,
        },
        true,
      ),
    };
    const arcStop = {
      in: this.positionToLinePosition(
        {
          x: stopPosition.x + indicatorSize / 2,
          y: stopPosition.y + indicatorSize / 2,
        },
        false,
      ),
      out: this.positionToLinePosition(
        {
          x: stopPosition.x + indicatorSize / 2,
          y: stopPosition.y + indicatorSize / 2,
        },
        true,
      ),
    };
    const arcRadius = componentSize / 2 - indicatorSize / 2;

    if (Array.isArray(lineColor)) {
      const startColor = TinyColor(lineColor[0]).toRgb();
      const stopColor = TinyColor(lineColor[1]).toRgb();
      const getRatioColor = ratio => {
        // ratio: 0..1
        const getRatio = (a, b) => a + ratio * (b - a);
        return TinyColor({
          r: getRatio(startColor.r, stopColor.r),
          g: getRatio(startColor.g, stopColor.g),
          b: getRatio(startColor.b, stopColor.b),
          a: getRatio(startColor.a, stopColor.a),
        }).toHexString();
      };

      const points = [arcStart, ...sides, arcStop];

      let totalDistance = 0;
      for (let i = 1; i < points.length; i += 1) {
        totalDistance += distanceBetweenPoints(points[i - 1].in, points[i].in);
      }

      let elapsedDistance = 0;
      const result = [];
      for (let i = 1; i < points.length; i += 1) {
        const a = points[i - 1];
        const b = points[i];
        const path = new Path();
        path.moveTo(a.in.x, a.in.y);
        path
          .arcTo(
            b.in.x,
            b.in.y,
            arcRadius - lineWidth / 2,
            arcRadius - lineWidth / 2,
          )
          .lineTo(b.out.x, b.out.y);
        path.counterArcTo(
          a.out.x,
          a.out.y,
          arcRadius + lineWidth / 2,
          arcRadius + lineWidth / 2,
        );

        const distance = distanceBetweenPoints(a.in, b.in);
        if (distance > 0.1 || (i > 1 && i < points.length - 1)) {
          result.push({
            id: `gradient-${i}`,
            arc: path.close(),
            fill: new LinearGradient(
              {
                '0': getRatioColor(elapsedDistance / totalDistance),
                '1': getRatioColor(
                  (elapsedDistance + distance) / totalDistance,
                ),
              },
              `${a.in.x}`,
              `${a.in.y}`,
              `${b.in.x}`,
              `${b.in.y}`,
            ),
          });
        }
        elapsedDistance += distance;
      }
      return result;
    }

    // Single color case
    const filteredSides = sides.filter(
      s => distanceBetweenPoints(s.in, arcStop.in) > 0.1,
    );
    const path = new Path();
    path.moveTo(arcStart.in.x, arcStart.in.y);
    filteredSides.forEach(s =>
      path.arcTo(
        s.in.x,
        s.in.y,
        arcRadius - lineWidth / 2,
        arcRadius - lineWidth / 2,
      ),
    );
    path
      .arcTo(
        arcStop.in.x,
        arcStop.in.y,
        arcRadius - lineWidth / 2,
        arcRadius - lineWidth / 2,
      )
      .lineTo(arcStop.out.x, arcStop.out.y);
    filteredSides
      .reverse()
      .forEach(s =>
        path.counterArcTo(
          s.out.x,
          s.out.y,
          arcRadius + lineWidth / 2,
          arcRadius + lineWidth / 2,
        ),
      );
    path.counterArcTo(
      arcStart.out.x,
      arcStart.out.y,
      arcRadius + lineWidth / 2,
      arcRadius + lineWidth / 2,
    );
    return [{ id: 'simple', arc: path.close(), fill: lineColor }];
  }

  /**
   * @returns {undefined}
   */
  updateIndicators({ start, stop }) {
    const startPosition = this.timeToindicatorPosition(start);
    const stopPosition = this.timeToindicatorPosition(stop);
    this.startImagePosition.setValue(startPosition);
    this.stopImagePosition.setValue(stopPosition);
    this.setState({ startPosition, stopPosition });

    if (this.props.onChange) {
      this.reportUpdate(start, stop);
    }
  }

  reportUpdate(start, stop) {
    if (
      this.lastReportedStart.hour !== start.hour ||
      this.lastReportedStart.minute !== start.minute ||
      this.lastReportedStop.hour !== stop.hour ||
      this.lastReportedStop.minute !== stop.minute
    ) {
      this.lastReportedStart = start;
      this.lastReportedStop = stop;
      this.props.onChange(start, stop);
    }
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const {
      componentSize,
      indicatorSize,
      startIndicator,
      stopIndicator,
      disabled,
    } = this.props;

    return (
      <View
        style={[
          styles.container,
          {
            width: componentSize,
            height: componentSize,
          },
        ]}
      >
        <View style={styles.arc} {...this.turningPanResponder.panHandlers}>
          <Surface width={componentSize} height={componentSize}>
            {this.updateArc().map(({ id, arc, fill }) => (
              <Shape key={id} d={arc} fill={fill} />
            ))}
          </Surface>
        </View>

        <Animated.View
          {...(disabled ? {} : this.startPanResponder.panHandlers)}
          style={[
            this.startImagePosition.getLayout(),
            styles.dragged,
            {
              width: indicatorSize,
              height: indicatorSize,
            },
          ]}
        >
          {startIndicator && startIndicator()}
        </Animated.View>
        <Animated.View
          {...(disabled ? {} : this.stopPanResponder.panHandlers)}
          style={[
            this.stopImagePosition.getLayout(),
            styles.dragged,
            {
              width: indicatorSize,
              height: indicatorSize,
            },
          ]}
        >
          {stopIndicator && stopIndicator()}
        </Animated.View>
      </View>
    );
  }
}
