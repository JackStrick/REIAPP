/**
 * Spinner component for displaying a loading spinner.
 * 
 * @component
 * @returns {JSX.Element} - Rendered Spinner component.
 */
function Spinner() {
  return (
    <div className="loadingSpinnerContainer">
        <div className="loadingSpinner"></div>
    </div>
  )
}

export default Spinner