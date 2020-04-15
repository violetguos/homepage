import * as React from 'react'

function SvgMoon(props) {
  return (
    <svg width={20} height={20} fill="none" {...props}>
      <path
        d="M20 10.9A10.022 10.022 0 119.1 0 7.794 7.794 0 0020 10.9z"
        fill="#3A63B3"
      />
    </svg>
  )
}

export default SvgMoon
