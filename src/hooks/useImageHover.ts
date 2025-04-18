import React from "react";

export const useImageHover = (images: string[]) => {
	const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

	const handleMouseMove = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const sectionWidth = rect.width / images.length;
		const newIndex = Math.floor(x / sectionWidth);
		if (newIndex >= 0 && newIndex < images.length) {
			setCurrentImageIndex(newIndex);
		}
	}, [images.length]);

	return { currentImageIndex, handleMouseMove };
};
