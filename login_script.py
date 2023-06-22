import requests

def perform_login(email, password):
    url = "http://localhost:8000/api/login/"
    payload = {
        "email": email,
        "password": password
    }
    response = requests.post(url, json=payload)
    data = response.json()
    token = data["token"]
    
    # Store the token for future use (e.g., in a variable or in local storage)
    # You can access the token using the 'token' variable and perform actions with it
    
    print("Login successful!")
    print("Token:", token)

# Call the function and pass the email and password as arguments
email = input("Enter your email: ")
password = input("Enter your password: ")
perform_login(email, password)
