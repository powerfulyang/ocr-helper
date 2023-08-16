import { useEffect, useRef, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

const { body } = document;
export const root = document.createElement('div');
root.id = 'root-content-script';
body.appendChild(root);

export const ContentScript = () => {
  const [screenshotting, setScreenshotting] = useState(false);

  useHotkeys('mod+shift+1', () => {
    setScreenshotting(true);
    const bodyStyle = document.body.style;
    bodyStyle.cursor = 'crosshair';
    bodyStyle.userSelect = 'none';
    bodyStyle.position = 'relative';
  });
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [endPoint, setEndPoint] = useState({ x: 0, y: 0 });

  const isMouseDownRef = useRef(false);

  useEffect(() => {
    if (screenshotting) {
      const mouseDownHandler = (e: MouseEvent) => {
        isMouseDownRef.current = true;
        setStartPoint({ x: e.clientX, y: e.clientY });
        setEndPoint({ x: e.clientX, y: e.clientY });
      };
      const mouseMoveHandler = (e: MouseEvent) => {
        if (isMouseDownRef.current) {
          setEndPoint({ x: e.clientX, y: e.clientY });
        }
      };
      const mouseUpHandler = () => {
        isMouseDownRef.current = false;
      };
      window.addEventListener('mousedown', mouseDownHandler);
      window.addEventListener('mousemove', mouseMoveHandler);
      window.addEventListener('mouseup', mouseUpHandler);

      return () => {
        window.removeEventListener('mousedown', mouseDownHandler);
        window.removeEventListener('mousemove', mouseMoveHandler);
        window.removeEventListener('mouseup', mouseUpHandler);
      };
    }
    return () => {};
  }, [screenshotting]);

  const top = Math.min(startPoint.y, endPoint.y);
  const left = Math.min(startPoint.x, endPoint.x);
  const width = Math.abs(startPoint.x - endPoint.x);
  const height = Math.abs(startPoint.y - endPoint.y);

  return (
    screenshotting && (
      <>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: left,
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.2)',
            zIndex: 9999,
          }}
        >
          左边部分
        </div>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left,
            width,
            height: top,
            backgroundColor: 'rgba(0,0,0,0.2)',
            zIndex: 9999,
          }}
        >
          上边部分
        </div>
        <div
          style={{
            position: 'absolute',
            top,
            left,
            width,
            height,
            border: '1px solid red',
            zIndex: 9999,
          }}
        >
          1
        </div>
        <div
          style={{
            position: 'absolute',
            top: top + height,
            left,
            width,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.2)',
            zIndex: 9999,
          }}
        >
          下边部分
        </div>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: left + width,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.2)',
            zIndex: 9999,
          }}
        >
          右边部分
        </div>
      </>
    )
  );
};
