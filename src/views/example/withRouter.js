import { useNavigate } from 'react-router-dom';

export const withRouter1 = (Component) => {
    const Wrapper = (props) => {
        const navigate = useNavigate();

        return (
            <Component
                navigate={navigate}
                {...props}
            />
        );
    };

    return Wrapper;
};
export default withRouter1