export const Footer = ({porcentaje}) => {
    if (isNaN(porcentaje) || porcentaje <= 0) {
        return null;
    }
    return (
        <div className="progress fixed-bottom">
        <div
            className="progress-bar bg-primary progress-bar-striped progress-bar-animated"
            role="progressbar"
            style={{ width: `${porcentaje * 100}%` }}
            aria-valuenow={porcentaje * 100}
            aria-valuemin="50"
            aria-valuemax="100"
            // aria es un narrador
            // aria-valuenow="25"
            // aria-valuemin="0"
            // aria-valuemax="100"
            >
            { Math.floor(porcentaje * 100)}%
        </div>
        </div>
    );
};

export default Footer;
