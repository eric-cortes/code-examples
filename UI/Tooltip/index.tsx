"use client";

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";

import { cn } from "@/utils/cn";
import { testIdProps } from "@/utils/testId";
import { Text } from "../Text";
import { animationStyles } from "./styles";
import type { TooltipProps } from "./types";

function Tooltip(props: TooltipProps) {
	const { children, text, tooltipKey, side = "bottom", disabled = false, style, className, testID } = props;

	if (disabled) {
		return <>{children}</>;
	}

	return (
		<TooltipPrimitive.Provider delay={200}>
			<TooltipPrimitive.Root>
				<TooltipPrimitive.Trigger render={<span />} className="cursor-help">
					{children}
				</TooltipPrimitive.Trigger>
				<TooltipPrimitive.Portal>
					<style>{animationStyles}</style>
					<TooltipPrimitive.Positioner side={side} sideOffset={14} collisionAvoidance={{ side: "none", fallbackAxisSide: "none" }} className="z-50">
						<TooltipPrimitive.Popup
							className={cn(
								"tooltip-popup",
								"bg-[#353B47] border-[0.5px] border-white/[0.08] shadow-none px-3 py-2 rounded-md z-50",
								className,
							)}
							style={style}
							{...testIdProps(testID)}
						>
							<TooltipPrimitive.Arrow className="size-2.5 rotate-45 bg-[#353B47] border-[0.5px] border-white/[0.08] border-b-0 border-r-0 data-[side=bottom]:-top-[5px] data-[side=top]:-bottom-[5px] data-[side=top]:rotate-[225deg] data-[side=left]:-right-[5px] data-[side=left]:rotate-[135deg] data-[side=right]:-left-[5px] data-[side=right]:-rotate-45" />
							<div className="flex items-center justify-start gap-2">
								<Text size="xs" className="break-words whitespace-normal text-[#D5D9E0]">
									<span className="text-left">{text}</span>
								</Text>
								{tooltipKey && tooltipKey !== "" && (
									<div className="border-[0.5px] border-white/[0.12] bg-white/10 px-1.5 py-0.5 rounded flex-shrink-0">
										<Text size="xs" weight="normal" className="text-[#D5D9E0]">
											{tooltipKey}
										</Text>
									</div>
								)}
							</div>
						</TooltipPrimitive.Popup>
					</TooltipPrimitive.Positioner>
				</TooltipPrimitive.Portal>
			</TooltipPrimitive.Root>
		</TooltipPrimitive.Provider>
	);
}

export { Tooltip };
