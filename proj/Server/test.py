import requests

img = "https://i.imgur.com/sZL7bMs.jpg"

url = "http://cl-api.vize.ai/3657"
files = {'image': open("C:\\Users\\Orlando\\Documents\\GitHub\\rheijnen.github.io\\proj\\Server\\test.jpg", 'rb')}

headers = {"Authorization": "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjM0MzgsImlhdCI6MTUxMTQzNzMyNiwiZXhwIjoxNTE5MjEzMzI2fQ.vqRn6VJKLjl2gte65ylFx_JP7O5XUym8_YRVdDDxQQA"}
response = requests.request("POST", url, files=files, headers=headers)
print(response.text)