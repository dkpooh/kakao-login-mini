import React, { useEffect, useState } from 'react';

const App = () => {
  const [ profile, setProfile ] = useState({
    nickname: '',
    thumbnail_image_url: '',
    isLogin: false
  })

  const getUserInfo = () => {
    const { Kakao } = window
    Kakao.API.request({
      url: '/v2/user/me',
      success: (response) => {
        const { nickname, thumbnail_image_url } = response.kakao_account.profile
        setProfile({
          nickname: nickname,
          thumbnail_image_url: thumbnail_image_url,
          isLogin: !profile.isLogin
        })
      },
      fail: (error) => {
        console.log(error);
      }
    })
  }

  useEffect(() => {
    const { Kakao } = window
    Kakao.init('eb521e3b1e30320df59abf5dd2695e4c')

    const storageAccessToken = localStorage.getItem("access:ccc_token")
    const storageRefreshToken = localStorage.getItem('refresh_token')

    if ((storageAccessToken && storageAccessToken.length > 0) && (storageRefreshToken && storageRefreshToken.length > 0)) {
      getUserInfo()
    } else {
      Kakao.Auth.createLoginButton({
        container: '#kakao',
        success: function(response) {
          const { access_token, refresh_token } = response
          localStorage.setItem('access_token', access_token)
          localStorage.setItem('refresh_token', refresh_token)
          getUserInfo()
        },
        fail: (error) => {
          console.log(error);
        }
      });
    }
  }, [])
  return (
    <>
      <div id='kakao'>
      </div>
      {profile.isLogin &&
        <ul>
          <li>{`${profile.nickname}님 안녕하세요`}</li>
          <li>
            <img src={profile.thumbnail_image_url} alt="" />
          </li>
        </ul>
      }
    </>
  );
};

export default App;


