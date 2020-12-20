import React, { ReactNode } from "react";

interface ReactNodeWithRefAndKey {
  key: string,
  ref: {
    current: HTMLElement
  }
};

const calculateBoundingBoxes = (children: ReactNode) => {
  const boundingBoxes: {[index: string]:DOMRect} = {};

  React.Children.forEach(children, (childRN) => {
    const child = (childRN as ReactNodeWithRefAndKey);
    const domNode = child.ref.current;
    if (domNode) {
      const nodeBoundingBox = domNode.getBoundingClientRect();
      boundingBoxes[child.key] = nodeBoundingBox;
    }
  });

  return boundingBoxes;
};

export default calculateBoundingBoxes;
