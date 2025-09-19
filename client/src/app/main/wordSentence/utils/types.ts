declare module "react-mic" {
  import * as React from "react";

  export interface ReactMicProps {
    record: boolean;
    className?: string;
    backgroundColor?: string;
    strokeColor?: string;
    mimeType?: string;
    onStop?: (recordedData: any) => void;
    onData?: (recordedData: any) => void;
    echoCancellation?: boolean;
    channelCount?: number;
  }

  export class ReactMic extends React.Component<ReactMicProps> {}
}
