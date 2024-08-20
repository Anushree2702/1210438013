$headers = @{
    "Content-Type" = "application/json"
}

$body = @{
    "companyName" = "new_calci"
    "ownerName" = "Anushree"
    "rollNo" = "1210438013"
    "ownerEmail" = "new_unique_email@example.com"
    "accessCode" = "YLoQJB"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://20.244.56.144/test/register" -Method Post -Headers $headers -Body $body
