import * as React from 'react'

function SvgSun(props) {
  return (
    <svg width={20} height={20} fill="none" {...props}>
      <g
        clipPath="url(#sun_svg__clip0)"
        stroke="#F9C11C"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 14.167a4.167 4.167 0 100-8.334 4.167 4.167 0 000 8.334zM10 .833V2.5M10 17.5v1.667M3.517 3.517L4.7 4.7M15.3 15.3l1.183 1.183M.833 10H2.5M17.5 10h1.667M3.517 16.483L4.7 15.3M15.3 4.7l1.183-1.183" />
      </g>
      <defs>
        <clipPath id="sun_svg__clip0">
          <path fill="#fff" d="M0 0h20v20H0z" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default SvgSun
