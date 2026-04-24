import { Dispatch, RefObject, SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from "react"

import clsx from "clsx";
import styles from "./Resizer.module.scss";

type HorizontalDirection = 'left' | 'right';
type VerticalDirection = 'top' | 'bottom';

interface HorizontalResizerProps {
    direction: HorizontalDirection;
    sidebarRef: RefObject<HTMLDivElement | null>;
    setSidebarWidth: Dispatch<SetStateAction<number>>;
    MIN_WIDTH: number;
    MAX_WIDTH: number;

    setSidebarHeight?: never;
    MIN_HEIGHT?: never;
    MAX_HEIGHT?: never;
}

interface VerticalResizerProps {
    direction: VerticalDirection;
    sidebarRef: RefObject<HTMLDivElement | null>;
    setSidebarHeight: Dispatch<SetStateAction<number>>;
    MIN_HEIGHT: number;
    MAX_HEIGHT: number;

    setSidebarWidth?: never;
    MIN_WIDTH?: never;
    MAX_WIDTH?: never;
}

type ResizerProps = HorizontalResizerProps | VerticalResizerProps;

const Resizer = ({sidebarRef, setSidebarWidth, setSidebarHeight, direction, MIN_WIDTH, MAX_WIDTH, MIN_HEIGHT, MAX_HEIGHT}: ResizerProps) => {
    const overlayRef = useRef<HTMLDivElement | null>(null);
    const [isResizing, setIsResizing] = useState(false);
    const [cursor, setCursor] = useState<string | null>(null);

    const getBaseCursor = useCallback(() => {
        if(direction === "left" || direction === "right") return "col-resize";
        else if(direction === "top" || direction === "bottom") return "row-resize";
    }, [direction]);

    const startResizing = useCallback(() => {
        if (sidebarRef.current) {
            const rect = sidebarRef.current.getBoundingClientRect();
            if (direction === "left" || direction === "right") {
                setSidebarWidth(rect.width);
            } else if (direction === "top" || direction === "bottom") {
                setSidebarHeight(rect.height);
            }
        }

        setIsResizing(true);
        
        if(overlayRef.current) overlayRef.current.style.display = "block";
    }, [sidebarRef, setSidebarWidth, setSidebarHeight, direction]);

    const stopResizing = useCallback(() => {
        setIsResizing(false);

        if(overlayRef.current) overlayRef.current.style.display = "none";
    }, []);

    const resize = useCallback((e: MouseEvent) => {
        if (!isResizing || !sidebarRef.current) return;

        const rect = sidebarRef.current.getBoundingClientRect();
        let newSize;
        let cursorStyle = getBaseCursor();

        if (direction === "left") {
            newSize = rect.right - e.clientX;
            if (MIN_WIDTH !== undefined) newSize = Math.max(MIN_WIDTH, newSize);
            if (MAX_WIDTH !== undefined) newSize = Math.min(MAX_WIDTH, newSize);
            if (newSize <= MIN_WIDTH) cursorStyle = "w-resize";
            else if (newSize >= MAX_WIDTH) cursorStyle = "e-resize";
            setSidebarWidth?.(newSize);
        } else if (direction === "right") {
            newSize = e.clientX - rect.left;
            if (MIN_WIDTH !== undefined) newSize = Math.max(MIN_WIDTH, newSize);
            if (MAX_WIDTH !== undefined) newSize = Math.min(MAX_WIDTH, newSize);
            if (newSize <= MIN_WIDTH) cursorStyle = "e-resize";
            else if (newSize >= MAX_WIDTH) cursorStyle = "w-resize";
            setSidebarWidth?.(newSize);
        } else if (direction === "top") {
            newSize = rect.bottom - e.clientY;
            if (MIN_HEIGHT !== undefined) newSize = Math.max(MIN_HEIGHT, newSize);
            if (MAX_HEIGHT !== undefined) newSize = Math.min(MAX_HEIGHT, newSize);
            if (newSize <= MIN_HEIGHT) cursorStyle = "n-resize";
            else if (newSize >= MAX_HEIGHT) cursorStyle = "s-resize";
            setSidebarHeight?.(newSize);
        } else if (direction === "bottom") {
            newSize = e.clientY - rect.top;
            if (MIN_HEIGHT !== undefined) newSize = Math.max(MIN_HEIGHT, newSize);
            if (MAX_HEIGHT !== undefined) newSize = Math.min(MAX_HEIGHT, newSize);
            if (newSize <= MIN_HEIGHT) cursorStyle = "n-resize";
            else if (newSize >= MAX_HEIGHT) cursorStyle = "s-resize";
            setSidebarHeight?.(newSize);
        }
        
        if (cursorStyle) {
            setCursor(cursorStyle);
            
            if (overlayRef.current) overlayRef.current.style.cursor = cursorStyle;
        }
    }, [sidebarRef, MAX_WIDTH, MIN_WIDTH, direction, setSidebarWidth, MAX_HEIGHT, MIN_HEIGHT, setSidebarHeight, isResizing, getBaseCursor]);

    useEffect(() => {
        window.addEventListener("mousemove", resize);
        window.addEventListener("mouseup", stopResizing);
        
        return () => {
            window.removeEventListener("mousemove", resize);
            window.removeEventListener("mouseup", stopResizing);
        };
    }, [resize, stopResizing]);

    const style = useMemo(() => {
        let directionStyle;

        if(direction === "left" || direction === "right") {
            directionStyle = {[direction]: "-2px", width: "4px", height: "100%"};
        } else if(direction === "top" || direction === "bottom") {
            directionStyle = {[direction]: "-2px", width: "100%", height: "4px"};
        }

        return { ...directionStyle, cursor: cursor ?? getBaseCursor() };
    }, [direction, cursor, getBaseCursor]);
    
    return (
        <>
            <div className={clsx(styles.resizer, isResizing && styles.active)}
                onMouseDown={startResizing}
                style={style}
            ></div>

            <div
                ref={overlayRef}
                className={styles.overlay}
            ></div>
        </>
    );
}

export default Resizer;