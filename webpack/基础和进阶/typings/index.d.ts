// see: https://github.com/zeit/next-plugins/issues/91
declare module '*.scss' {
  const content: { [className: string]: string }
  export = content
}

declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'
