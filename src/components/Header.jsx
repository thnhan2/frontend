import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

Header.propTypes = {
    heading: PropTypes.string.isRequired,
    paragraph: PropTypes.string.isRequired,
    linkName: PropTypes.string.isRequired,
    linkUrl: PropTypes.string,
};

export default function Header({
    heading,
    paragraph,
    linkName,
    linkUrl = '#',
}) {
    return (
        <div className="flex flex-col items-center mt-3">
            <div className="flex flex-col items-center justify-center space-x-4">
                <div>
                    <span className="text-amber-500 font-noto h-14 w-40 text-2xl p-1 bg-gray-200 rounded-full">
                        SOA MENU
                    </span>
                </div>

                <h2 className="text-3xl font-extrabold text-gray-900">
                    {heading}
                </h2>
            </div>
            <p className="mt-2 text-sm text-gray-600">
                {paragraph}{' '}
                <Link
                    to={linkUrl}
                    className="font-medium text-purple-600 hover:text-purple-500"
                >
                    {linkName}
                </Link>
            </p>
        </div>
    );
}
