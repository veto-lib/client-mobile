import { FC, Ref, SyntheticEvent } from 'react';
import { NativeMethods, ViewProps } from 'react-native';

declare module 'react-native-dropdown-select-list' {
  declare const SelectList: FC<any>;
  export default SelectList;
}
