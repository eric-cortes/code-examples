export const animationStyles = `
	.tooltip-popup {
		opacity: 1;
		transform: scale(1);
		transform-origin: var(--transform-origin);
		transition: opacity 100ms ease-out, transform 100ms ease-out;
	}
	.tooltip-popup[data-starting-style],
	.tooltip-popup[data-ending-style] {
		opacity: 0;
		transform: scale(0.9);
	}
	.tooltip-popup[data-instant] {
		transition: none;
	}
	.tooltip-arrow {
		width: 8px;
		height: 4px;
	}
	.tooltip-arrow svg {
		display: block;
		width: 100%;
		height: 100%;
	}
	.tooltip-arrow[data-side="top"] {
		transform: rotate(180deg);
	}
	.tooltip-arrow[data-side="left"] {
		transform: rotate(90deg);
	}
	.tooltip-arrow[data-side="right"] {
		transform: rotate(-90deg);
	}
`;
