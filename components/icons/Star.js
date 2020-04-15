import * as React from 'react'

function SvgStar(props) {
  return (
    <svg width={14} height={13} fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 5l-4.9-.64L7 0 4.9 4.36 0 5l3.6 3.26L2.67 13 7 10.67 11.33 13l-.93-4.74L14 5z"
        fill="#586069"
      />
    </svg>
  )
}

export default SvgStar
