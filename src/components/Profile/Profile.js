import PropTypes  from 'prop-types';
import './Profile.css';

function Profile(props)  {
    const { data } = props;
    const name = `${data.name.title} ${data.name.first} ${data.name.last}`;

    return (
        <div className = 'profile'>
            <img src = {data.picture.large} alt = {name} />
            <p className = 'user-name'>{name}</p>
        </div>
    );
}

Profile.propTypes = {
    data : PropTypes.shape({
        name : PropTypes.shape({
            title : PropTypes.string.isRequired,
            first : PropTypes.string.isRequired,
            last  : PropTypes.string.isRequired
        }),
        picture : PropTypes.shape({
            large : PropTypes.string.isRequired
        })
    })
};

export default Profile;
