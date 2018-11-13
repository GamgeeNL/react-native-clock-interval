# react-native-clock-interval
React Native Time interval control similar to iOS12 Bedtime picker

![](clock-interval.gif)

## Installation

`npm install react-native-clock-interval --save`

`yarn add react-native-clock-interval`

### ReactART based component

To use the component, you need to include the ART library in your project on iOS, for android it's already included.

#### For CocoaPod users:

Add the `ART` subspec like so:
```ruby
pod 'React', path: '../node_modules/react-native', subspecs: [
  'ART',
]
```

#### Or manually:

Add the `ART.xcodeproj` (found in `node_modules/react-native/Libraries/ART`) to the **Libraries** group and add `libART.a` to **Link Binary With Libraries** under **Build Phases**. [More info and screenshots about how to do this is available in the React Native documentation](http://facebook.github.io/react-native/docs/linking-libraries-ios.html#content).

## Usage

```js
import TimeInterval from 'react-native-clock-interval';

<TimeInterval
  disabled={false}
  allowLineDrag={true}
  componentSize={300}
  indicatorSize={40}
  lineWidth={40}
  lineColor="green"
  start={{hour: 22, minute: 0}}
  stop={{hour: 7, minute: 30}}
  onChange={(start, stop) => {/* called on every change, use with caution */}}
  onRelease={(start, stop) => {/* called in the end of interaction */}}
  startIndicator={() => <View>{/* custom indicator layout */}</View>} 
  stopIndicator={() => <View>{/* custom indicator layout */}</View>} 
  background={() => <View>{/* custom layout */}</View>}
  />
```

## License

[MIT License](http://opensource.org/licenses/mit-license.html). © Pavel Zarecky 2018
