import * as React from 'react';
import { ViewProperties } from 'react-native';

/**
 * Clock time
 *
 * @export
 * @interface Time
 */
export interface Time {
	/**
	 * Hours (0-23)
	 *
	 * @type {number}
	 * @memberof Time
	 */
	hour: number

	/**
	 * Minutes (0-59)
	 *
	 * @type {number}
	 * @memberof Time
	 */
	minute: number
}

/**
 * Properties for `TimeIntervalPropTypes` components
 *
 * @export
 * @interface TimeIntervalPropTypes
 */
export interface TimeIntervalPropTypes {

	/**
	 * Width and height of the whole component
	 *
	 * @type {number}
	 * @memberof TimeIntervalPropTypes
	 */
	componentSize: number

	/**
	 * Width and height of the indicator
	 *
	 * @type {number}
	 * @memberof TimeIntervalPropTypes
	 */
	indicatorSize: number

	/**
	 * Thickness of the arc
	 *
	 * @type {number}
	 * @memberof TimeIntervalPropTypes
	 */
	lineWidth: number

	/**
	 * Color of the arc line
	 *
	 * @type {string}
	 * @memberof TimeIntervalPropTypes
	 */
	lineColor: string | Array<string>

	/**
	 * Initial starting time
	 *
	 * @type {Time}
	 * @memberof TimeIntervalPropTypes
	 */
	start: Time

	/**
	 * Initial ending time
	 *
	 * @type {Time}
	 * @memberof TimeIntervalPropTypes
	 */
	stop: Time

	/**
	 * Whether user interaction is disabled
	 *
	 * @type {boolean}
	 * @memberof TimeIntervalPropTypes
	 * @default false
	 */
	disabled?: boolean

	/**
	 * Whether dragging the arc line is enabled
	 *
	 * @type {boolean}
	 * @memberof TimeIntervalPropTypes
	 * @default true
	 */
	allowLineDrag?: boolean

	/**
	 * Interaction step (minutes)
	 *
	 * @type {number}
	 * @memberof TimeIntervalPropTypes
	 * @default 1
	 */
	step?: number

	/**
	 * Called in the end of interaction
	 *
	 * @type {function}
	 * @memberof TimeIntervalPropTypes
	 */
	onRelease(start: Time, stop: Time): void

	/**
	 * Called on every change during interaction
	 *
	 * @type {function}
	 * @memberof TimeIntervalPropTypes
	 */
	onChange?(start: Time, stop: Time): void

	/**
	 * Defines a component to display as start indicator
	 *
	 * @type {function}
	 * @memberof TimeIntervalPropTypes
	 */
	startIndicator?(): React.ReactNode

	/**
	 * Defines a component to display as stop indicator
	 *
	 * @type {function}
	 * @memberof TimeIntervalPropTypes
	 */
	stopIndicator?(): React.ReactNode
}

export default class TimeInterval extends React.Component<TimeIntervalPropTypes> { }
