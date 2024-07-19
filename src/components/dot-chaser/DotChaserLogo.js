import * as React from "react"

const DotChaserLogo = (props) =>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={400}
        height={400}
        viewBox="0 0 400 400"
        {...props}
    >
        <g fillRule="evenodd">
            <circle cx={200} cy={200} r={200} />
        </g>
    </svg>;

export default DotChaserLogo;
