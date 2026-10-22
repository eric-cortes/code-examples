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
`;
