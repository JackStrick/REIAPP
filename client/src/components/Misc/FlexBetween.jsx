const { Box } = require("@mui/material");
const { styled } = require("@mui/system");

/**
 * FlexBetween component for creating a flex container with space-between alignment.
 * 
 * @component
 * @example
 * // Example usage of FlexBetween component
 * <FlexBetween>
 *   <ChildComponent1 />
 *   <ChildComponent2 />
 * </FlexBetween>
 *
 * @returns {JSX.Element} - Rendered FlexBetween component.
 */
const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export default FlexBetween;