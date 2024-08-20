# Define the token endpoint URL
$tokenEndpoint = "http://20.244.56.144/oauth/token"  # Verify this URL

# Your client credentials
$clientID = "9f10c761-5b6e-43bd-8bb5-075e6a67ad6e"
$clientSecret = "IcDUBSYALJBrCgVo"

# Define the headers for the request
$headers = @{
    "Content-Type" = "application/x-www-form-urlencoded"
}

# Define the body for the request as a URL-encoded string
$body = "grant_type=client_credentials&client_id=$clientID&client_secret=$clientSecret"

# Send the request to get the access token
try {
    $response = Invoke-RestMethod -Uri $tokenEndpoint -Method Post -Headers $headers -Body $body
    # Extract the access token from the response
    $accessToken = $response.access_token
    # Output the access token for verification
    Write-Output "Access Token: $accessToken"
} catch {
    # Output the error message
    Write-Output "Error: $_"
}
