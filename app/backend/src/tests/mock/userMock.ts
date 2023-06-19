const userMock = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
  // senha: secret_admin
  }

const tokenInvalid = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY4NzIxNTI2MywiZXhwIjoxNjg3MjE1MjY0fQ.6madP8LK7VknDENNTu6SUgG37gxfPcIQRoK3l-Qz5DY';

export {
  userMock,
  tokenInvalid,
}