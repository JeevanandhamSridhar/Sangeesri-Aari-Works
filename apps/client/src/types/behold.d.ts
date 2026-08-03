// Type declaration for Behold.so web component
// https://behold.so/docs/widget/

declare namespace JSX {
  interface IntrinsicElements {
    'behold-widget': {
      'feed-id': string
      [key: string]: string
    }
  }
}
