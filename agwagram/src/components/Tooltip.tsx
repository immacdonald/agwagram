import React, { useEffect, useState } from "react";

import style from "./Tooltip.module.scss";
import classNames from "classnames";
import useComponentVisible from "../hooks/useComponentVisible";

interface TooltipProps {
    content: React.ReactNode;
    direction?: string;
    highlight?: boolean;
    interact?: boolean;
    delay?: number;
    tooltipOverride?: string | null;
    forceToggled?: boolean;
    setForceToggled?: React.Dispatch<React.SetStateAction<boolean>>;
    canHover?: boolean;
    children: React.ReactNode;
  }
  
  const Tooltip: React.FC<TooltipProps> = (props) => {
    const {
      content,
      direction = 'top',
      highlight = false,
      interact = false,
      delay = 500,
      tooltipOverride = null,
      forceToggled = false,
      setForceToggled = () => {},
      canHover = true,
      children,
    } = props;
  
    const [active, setActive] = useState(false);
    const [hoverTimeout, setHoverTimeout] = useState<number | null>(null);
  
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
  
    useEffect(() => {
      if (!isComponentVisible) {
        setForceToggled(false);
        setActive(false);
      }
  
      if (forceToggled) {
        setIsComponentVisible(true);
      }
    }, [forceToggled, isComponentVisible, setForceToggled, setIsComponentVisible]);
  
    const showTooltip = () => {
      if (!active) {
        setHoverTimeout(
          window.setTimeout(() => {
            setActive(true);
            setIsComponentVisible(true);
          }, delay)
        );
      }
    };
  
    const hideTooltip = () => {
      if (hoverTimeout) {
        window.clearTimeout(hoverTimeout);
        setHoverTimeout(null);
      }
      setActive(false);
    };
  
    const tooltipClasses = classNames(style.tooltip, {
      [tooltipOverride || '']: !!tooltipOverride,
    });
  
    return (
      <div
        ref={ref}
        className={style.tooltipWrapper}
        onMouseOver={canHover ? showTooltip : undefined}
        onMouseOut={interact && canHover ? undefined : hideTooltip}
        onMouseLeave={interact && canHover ? hideTooltip : undefined}
      >
        {children}
        {(active || forceToggled) && isComponentVisible && content ? (
          <div
            className={tooltipClasses}
            data-direction={direction}
            data-mode={highlight ? 'bold' : 'normal'}
          >
            <div className={style.tooltipInner}>{content}</div>
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  };
  
  export default Tooltip;