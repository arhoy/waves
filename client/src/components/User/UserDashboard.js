import React from 'react';
import UserLayout from '../../hoc/UserLayout/UserLayout';
import Button from '../utils/Button/Button';

const UserDashboard = ({user}) => {
    return (
        <UserLayout>
            <div>
                    <div className = "user_nfo_panel">
                        <h1> User info</h1>
                        <div>
                            <span>{user.userData.name}</span>
                            <span>{user.userData.lastname}</span>
                            <span>{user.userData.email}</span>
                        </div>
                        <Button
                            linkTo = "/user/user_profile"
                            btnStyle = "btn btn-primary"
                            title = "Edit Account Info"
                        />
                    </div>
                    <div className = "user_nfo_panel">
                        <h1> History Purchases</h1>
                        <div className = "user_product_block_wrapper">
                            #history
                        </div>
                    </div>
            </div>
        </UserLayout>
    
    );
};

export default UserDashboard;