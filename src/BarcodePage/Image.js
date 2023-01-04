import { useEffect } from "react";
import { useLongPress } from "../util/hooks"

export default function Image(props) {
    const longPressEvent = useLongPress(() => {
        props.close();
    });

    useEffect(() => {
        preventLongPressMenu(document.querySelectorAll('img'));

        function absorbEvent_(event) {
            var e = event || window.event;
            e.preventDefault && e.preventDefault();
            e.stopPropagation && e.stopPropagation();
            e.cancelBubble = true;
            e.returnValue = false;
            return false;
        }

        function preventLongPressMenu(nodes) {
            for (var i = 0; i < nodes.length; i++) {
                nodes[i].ontouchstart = absorbEvent_;
                nodes[i].ontouchmove = absorbEvent_;
                nodes[i].ontouchend = absorbEvent_;
                nodes[i].ontouchcancel = absorbEvent_;
            }
        }

    });

    return <div style={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        top: 0,
        zIndex: 10000,
        overflow: "hidden",
        backgroundColor: "rgb(17, 145, 46)"
    }}>
        <img style={{
            width: "100%",
            height: "100%"
        }} src={props.data} />
        
        <div {...longPressEvent} style={{
            width: "100vw",
            height: "100vh",
            position: "absolute",
            top: 0,
            zIndex: 10000,
            overflow: "hidden",
            opacity: 0
        }} />
    </div>
}