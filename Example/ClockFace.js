import React from 'react';
import PropTypes from 'prop-types';
import Svg, {G, Text, Rect} from 'react-native-svg';

const ClockFace = ({size, color, fontFamily}) => (
  <Svg width={`${size}`} height={`${size}`} viewBox="0 0 622 622">
    <G stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <Rect fill={color} x="308.4" y="31.3" width="5.2" height="39" />
      <Rect
        fill={color}
        x="337.5"
        y="32.8"
        transform="matrix(0.9945 0.1045 -0.1045 0.9945 6.4176 -35.2069)"
        width="3.3"
        height="21.6"
      />
      <Rect
        fill={color}
        x="365.3"
        y="37.2"
        transform="matrix(0.9781 0.2079 -0.2079 0.9781 18.0103 -75.2303)"
        width="3.3"
        height="21.7"
      />
      <Rect
        fill={color}
        x="392.4"
        y="44.5"
        transform="matrix(0.9511 0.309 -0.309 0.9511 36.3875 -119.0659)"
        width="3.3"
        height="21.7"
      />
      <Rect
        fill={color}
        x="418.7"
        y="54.6"
        transform="matrix(0.9135 0.4067 -0.4067 0.9135 62.9568 -165.306)"
        width="3.3"
        height="21.7"
      />
      <Rect
        fill={color}
        x="440.7"
        y="66.5"
        transform="matrix(0.866 0.5 -0.5 0.866 101.0252 -209.9748)"
        width="3.3"
        height="34"
      />
      <Rect
        fill={color}
        x="467.4"
        y="82.7"
        transform="matrix(0.809 0.5878 -0.5878 0.809 144.5416 -257.817)"
        width="3.3"
        height="21.7"
      />
      <Rect
        fill={color}
        x="489.2"
        y="100.4"
        transform="matrix(0.7431 0.6691 -0.6691 0.7431 200.5201 -299.8712)"
        width="3.3"
        height="21.8"
      />
      <Rect
        fill={color}
        x="509.1"
        y="120.3"
        transform="matrix(0.6691 0.7431 -0.7431 0.6691 266.4529 -336.1643)"
        width="3.3"
        height="21.8"
      />
      <Rect
        fill={color}
        x="526.8"
        y="142.1"
        transform="matrix(0.5878 0.809 -0.809 0.5878 341.6242 -364.4601)"
        width="3.3"
        height="21.7"
      />
      <Rect
        fill={color}
        x="537"
        y="162.8"
        transform="matrix(0.5 0.866 -0.866 0.5 424.8339 -376.6684)"
        width="3.3"
        height="33.7"
      />
      <Rect
        fill={color}
        x="554.9"
        y="190.8"
        transform="matrix(0.4067 0.9135 -0.9135 0.4067 514.4257 -388.8255)"
        width="3.3"
        height="21.7"
      />
      <Rect
        fill={color}
        x="565.1"
        y="217.1"
        transform="matrix(0.309 0.9511 -0.9511 0.309 608.3445 -381.4786)"
        width="3.3"
        height="21.6"
      />
      <Rect
        fill={color}
        x="572.4"
        y="244.3"
        transform="matrix(0.2079 0.9781 -0.9781 0.2079 704.1971 -359.4255)"
        width="3.3"
        height="21.5"
      />
      <Rect
        fill={color}
        x="576.5"
        y="271.8"
        transform="matrix(0.1045 0.9945 -0.9945 0.1045 799.0396 -321.5663)"
        width="3.3"
        height="22.2"
      />
      <Rect fill={color} x="551.9" y="308.4" width="38.7" height="5.2" />
      <Rect
        fill={color}
        x="576.7"
        y="328.3"
        transform="matrix(-0.1045 0.9945 -0.9945 -0.1045 976.0774 -200.6593)"
        width="3.3"
        height="21.6"
      />
      <Rect
        fill={color}
        x="572.3"
        y="356"
        transform="matrix(-0.2079 0.9781 -0.9781 -0.2079 1052.1365 -118.2253)"
        width="3.3"
        height="21.7"
      />
      <Rect
        fill={color}
        x="565"
        y="383.2"
        transform="matrix(-0.309 0.9511 -0.9511 -0.309 1116.553 -23.0837)"
        width="3.3"
        height="21.7"
      />
      <Rect
        fill={color}
        x="554.9"
        y="409.5"
        transform="matrix(-0.4067 0.9135 -0.9135 -0.4067 1166.9222 82.8518)"
        width="3.3"
        height="21.7"
      />
      <Rect
        fill={color}
        x="536.8"
        y="425.3"
        transform="matrix(-0.5 0.866 -0.866 -0.5 1190.7777 197.1661)"
        width="3.3"
        height="34"
      />
      <Rect
        fill={color}
        x="526.8"
        y="458.2"
        transform="matrix(-0.5878 0.809 -0.809 -0.5878 1218.5532 317.1364)"
        width="3.3"
        height="21.7"
      />
      <Rect
        fill={color}
        x="509.1"
        y="480"
        transform="matrix(-0.6691 0.7431 -0.7431 -0.6691 1217.2842 439.7411)"
        width="3.3"
        height="21.8"
      />
      <Rect
        fill={color}
        x="489.2"
        y="499.9"
        transform="matrix(-0.7431 0.6691 -0.6691 -0.7431 1197.3793 561.8591)"
        width="3.3"
        height="21.8"
      />
      <Rect
        fill={color}
        x="467.4"
        y="517.6"
        transform="matrix(-0.809 0.5878 -0.5878 -0.809 1159.0358 680.3237)"
        width="3.3"
        height="21.7"
      />
      <Rect
        fill={color}
        x="440.8"
        y="521.8"
        transform="matrix(-0.866 0.5 -0.5 -0.866 1094.8724 783.8724)"
        width="3.3"
        height="33.7"
      />
      <Rect
        fill={color}
        x="418.7"
        y="545.7"
        transform="matrix(-0.9135 0.4067 -0.4067 -0.9135 1030.7218 894.0778)"
        width="3.3"
        height="21.7"
      />
      <Rect
        fill={color}
        x="392.5"
        y="555.9"
        transform="matrix(-0.9511 0.309 -0.309 -0.9511 943.9976 983.8902)"
        width="3.3"
        height="21.6"
      />
      <Rect
        fill={color}
        x="365.3"
        y="563.3"
        transform="matrix(-0.9781 0.2079 -0.2079 -0.9781 845.1436 1059.2224)"
        width="3.3"
        height="21.5"
      />
      <Rect
        fill={color}
        x="337.4"
        y="567"
        transform="matrix(-0.9945 0.1045 -0.1045 -0.9945 736.7125 1117.5657)"
        width="3.3"
        height="22.2"
      />
      <Rect fill={color} x="308.4" y="551.9" width="5.2" height="38.8" />
      <Rect
        fill={color}
        x="281.3"
        y="567.6"
        transform="matrix(-0.9945 -0.1045 0.1045 -0.9945 503.7888 1183.1543)"
        width="3.3"
        height="21.6"
      />
      <Rect
        fill={color}
        x="253.5"
        y="563.1"
        transform="matrix(-0.9781 -0.2079 0.2079 -0.9781 385.3191 1188.3721)"
        width="3.3"
        height="21.7"
      />
      <Rect
        fill={color}
        x="226.3"
        y="555.8"
        transform="matrix(-0.9511 -0.309 0.309 -0.9511 269.5966 1176.0242)"
        width="3.3"
        height="21.7"
      />
      <Rect
        fill={color}
        x="200"
        y="545.7"
        transform="matrix(-0.9135 -0.4067 0.4067 -0.9135 159.5319 1147.0273)"
        width="3.3"
        height="21.7"
      />
      <Rect
        fill={color}
        x="178"
        y="521.5"
        transform="matrix(-0.866 -0.5 0.5 -0.866 66.031 1094.6367)"
        width="3.3"
        height="34"
      />
      <Rect
        fill={color}
        x="151.4"
        y="517.6"
        transform="matrix(-0.809 -0.5878 0.5878 -0.809 -33.8727 1045.9583)"
        width="3.3"
        height="21.7"
      />
      <Rect
        fill={color}
        x="129.5"
        y="499.9"
        transform="matrix(-0.7431 -0.6691 0.6691 -0.7431 -113.154 978.0632)"
        width="3.3"
        height="21.8"
      />
      <Rect
        fill={color}
        x="109.6"
        y="480"
        transform="matrix(-0.6691 -0.7431 0.7431 -0.6691 -179.0741 901.973)"
        width="3.3"
        height="21.8"
      />
      <Rect
        fill={color}
        x="91.9"
        y="458.1"
        transform="matrix(-0.5878 -0.809 0.809 -0.5878 -230.8994 820.3363)"
        width="3.3"
        height="21.7"
      />
      <Rect
        fill={color}
        x="81.7"
        y="425.6"
        transform="matrix(-0.5 -0.866 0.866 -0.5 -258.0765 735.8339)"
        width="3.3"
        height="33.7"
      />
      <Rect
        fill={color}
        x="63.8"
        y="409.5"
        transform="matrix(-0.4067 -0.9135 0.9135 -0.4067 -291.9741 651.0699)"
        width="3.3"
        height="21.7"
      />
      <Rect
        fill={color}
        x="53.7"
        y="383.3"
        transform="matrix(-0.309 -0.9511 0.9511 -0.309 -302.4091 568.4519)"
        width="3.3"
        height="21.6"
      />
      <Rect
        fill={color}
        x="46.3"
        y="356.1"
        transform="matrix(-0.2079 -0.9781 0.9781 -0.2079 -300.9406 490.1182)"
        width="3.3"
        height="21.5"
      />
      <Rect
        fill={color}
        x="42.3"
        y="328"
        transform="matrix(-0.1045 -0.9945 0.9945 -0.1045 -288.7118 418.1864)"
        width="3.3"
        height="22.2"
      />
      <Rect fill={color} x="31.3" y="308.4" width="38.7" height="5.2" />
      <Rect
        fill={color}
        x="42"
        y="272.1"
        transform="matrix(0.1045 -0.9945 0.9945 0.1045 -242.2838 296.7119)"
        width="3.3"
        height="21.6"
      />
      <Rect
        fill={color}
        x="46.4"
        y="244.3"
        transform="matrix(0.2079 -0.9781 0.9781 0.2079 -211.4659 249.0835)"
        width="3.3"
        height="21.7"
      />
      <Rect
        fill={color}
        x="53.7"
        y="217.1"
        transform="matrix(0.309 -0.9511 0.9511 0.309 -178.5371 210.1254)"
        width="3.3"
        height="21.7"
      />
      <Rect
        fill={color}
        x="63.8"
        y="190.8"
        transform="matrix(0.4067 -0.9135 0.9135 0.4067 -145.411 179.4269)"
        width="3.3"
        height="21.7"
      />
      <Rect
        fill={color}
        x="81.9"
        y="162.7"
        transform="matrix(0.5 -0.866 0.866 0.5 -113.8339 162.172)"
        width="3.3"
        height="34"
      />
      <Rect
        fill={color}
        x="91.9"
        y="142.1"
        transform="matrix(0.5878 -0.809 0.809 0.5878 -85.222 138.7222)"
        width="3.3"
        height="21.7"
      />
      <Rect
        fill={color}
        x="109.6"
        y="120.3"
        transform="matrix(0.6691 -0.7431 0.7431 0.6691 -60.6501 126.0669)"
        width="3.3"
        height="21.8"
      />
      <Rect
        fill={color}
        x="129.5"
        y="100.4"
        transform="matrix(0.7431 -0.6691 0.6691 0.7431 -40.758 116.3322)"
        width="3.3"
        height="21.8"
      />
      <Rect
        fill={color}
        x="151.4"
        y="82.7"
        transform="matrix(0.809 -0.5878 0.5878 0.809 -25.7606 107.8001)"
        width="3.3"
        height="21.7"
      />
      <Rect
        fill={color}
        x="178"
        y="66.5"
        transform="matrix(0.866 -0.5 0.5 0.866 -17.6298 100.962)"
        width="3.3"
        height="33.7"
      />
      <Rect
        fill={color}
        x="200"
        y="54.6"
        transform="matrix(0.9135 -0.4067 0.4067 0.9135 -9.1735 87.678)"
        width="3.3"
        height="21.7"
      />
      <Rect
        fill={color}
        x="226.3"
        y="44.5"
        transform="matrix(0.9511 -0.309 0.309 0.9511 -5.9329 73.1366)"
        width="3.3"
        height="21.6"
      />
      <Rect
        fill={color}
        x="253.5"
        y="37.2"
        transform="matrix(0.9781 -0.2079 0.2079 0.9781 -4.4002 54.0847)"
        width="3.3"
        height="21.5"
      />
      <Rect
        fill={color}
        x="281.3"
        y="32.8"
        transform="matrix(0.9945 -0.1045 0.1045 0.9945 -3.0402 29.8143)"
        width="3.3"
        height="22.2"
      />

      <Text
        fill={color}
        transform="matrix(1 0 0 1 408.3519 148.1665)"
        fontFamily={fontFamily}
        fontSize="50">
        1
      </Text>
      <Text
        fill={color}
        transform="matrix(1 0 0 1 481.9938 224.6665)"
        fontFamily={fontFamily}
        fontSize="50">
        2
      </Text>
      <Text
        fill={color}
        transform="matrix(1 0 0 1 511.647 328.1665)"
        fontFamily={fontFamily}
        fontSize="50">
        3
      </Text>
      <Text
        fill={color}
        transform="matrix(1 0 0 1 481.5188 428.667)"
        fontFamily={fontFamily}
        fontSize="50">
        4
      </Text>
      <Text
        fill={color}
        transform="matrix(1 0 0 1 399.9934 506.7226)"
        fontFamily={fontFamily}
        fontSize="50">
        5
      </Text>
      <Text
        fill={color}
        transform="matrix(1 0 0 1 296.3999 534.9728)"
        fontFamily={fontFamily}
        fontSize="50">
        6
      </Text>
      <Text
        fill={color}
        transform="matrix(1 0 0 1 191.3267 506.7227)"
        fontFamily={fontFamily}
        fontSize="50">
        7
      </Text>
      <Text
        fill={color}
        transform="matrix(1 0 0 1 115.1016 433.7227)"
        fontFamily={fontFamily}
        fontSize="50">
        8
      </Text>
      <Text
        fill={color}
        transform="matrix(1 0 0 1 84.2764 328.1666)"
        fontFamily={fontFamily}
        fontSize="50">
        9
      </Text>
      <Text
        fill={color}
        transform="matrix(1 0 0 1 112.7367 224.6666)"
        fontFamily={fontFamily}
        fontSize="50">
        10
      </Text>
      <Text
        fill={color}
        transform="matrix(1 0 0 1 191.3813 150.1667)"
        fontFamily={fontFamily}
        fontSize="50">
        11
      </Text>
      <Text
        fill={color}
        transform="matrix(1 0 0 1 288.7504 120.6665)"
        fontFamily={fontFamily}
        fontSize="50">
        12
      </Text>
    </G>
  </Svg>
);

ClockFace.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  fontFamily: PropTypes.string,
};

ClockFace.defaultProps = {
  size: 324,
  color: '#000000',
  fontFamily: undefined,
};

export default ClockFace;
