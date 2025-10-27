"use client";
import React from "react";


export default function Icon({ name, size = 16, title }) {
const props = { width: size, height: size, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": title ? undefined : true };
switch (name) {
case "bold":
return (
<svg {...props}><path d="M7 5h7a4 4 0 0 1 0 8H7V5zm0 10h8a4 4 0 1 1 0 8H7v-8z"/></svg>
);
case "italic":
return (
<svg {...props}><path d="M10 4v3h2.21l-3.42 10H6v3h8v-3h-2.21l3.42-10H18V4h-8z"/></svg>
);
case "underline":
return (
<svg {...props}><path d="M12 17a5 5 0 0 0 5-5V4h-3v8a2 2 0 1 1-4 0V4H7v8a5 5 0 0 0 5 5zm-7 3v2h14v-2H5z"/></svg>
);
case "print":
return (
<svg {...props}><path d="M6 9V2h12v7H6zm0 2h12a4 4 0 0 1 4 4v5h-4v-4H6v4H2v-5a4 4 0 0 1 4-4z"/></svg>
);
default:
return null;
}
}