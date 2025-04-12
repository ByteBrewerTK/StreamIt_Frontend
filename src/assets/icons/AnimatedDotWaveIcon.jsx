const AnimatedDotWaveIcon = () => {
	return (
		<svg viewBox="0 0 24 24" className="w-[20px] h-[20px]">
			{/* Animated wave (outer ring) */}
			<circle
				cx="12"
				cy="12"
				r="9"
				fill="none"
				stroke="#fff"
				strokeWidth="1.5"
				className="opacity-75 animate-ping"
			/>

			{/* Animated wave (inner ring) */}
			<circle
				cx="12"
				cy="12"
				r="5"
				fill="none"
				stroke="#fff"
				strokeWidth="1.5"
				className="delay-200 opacity-75 animate-ping"
			/>

			{/* Center dot */}
			<circle cx="12" cy="12" r="1.8" fill="#fff" />
		</svg>
	);
};

export default AnimatedDotWaveIcon;
