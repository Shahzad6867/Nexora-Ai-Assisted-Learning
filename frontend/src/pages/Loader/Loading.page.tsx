import "./LoadingPage.css";

interface LoadingPageProps {
  message?: string;
}

const LoadingPage = ({
  message = "Preparing your learning experience...",
}: LoadingPageProps) => {
  return (
    <div className="nexora-loader">

      <div className="nexora-loader__content">
        

        {/* Main loader */}
        <div className="nexora-loader__visual">
          <div className="loader-orbit orbit-one" />
          <div className="loader-orbit orbit-two" />
          <div className="loader-orbit orbit-three" />

          <div className="loader-particle particle-one" />
          <div className="loader-particle particle-two" />
          <div className="loader-particle particle-three" />

          <div className="loader-core">
            <div className="loader-core__inner">
              ✦
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="nexora-loader__text">
          
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;