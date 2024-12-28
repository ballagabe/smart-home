using SmartHome.Server.Models;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using SmartHome.Server.Model;

public class HomebridgeService
{
    private readonly HttpClient _httpClient;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly Config _config;

    public HomebridgeService(HttpClient httpClient, IHttpContextAccessor httpContextAccessor, Config config)
    {
        _httpClient = httpClient;
        _httpContextAccessor = httpContextAccessor;
        _config = config;
    }

    public async Task<string> GetAccessoriesListAsync()
    {
        try
        {
            await LoginIntoHomebridgeAsync();
;            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _httpContextAccessor.HttpContext.Session.GetString("AccessToken"));
            var response = await _httpClient.GetAsync($"{_config.HomebridgeBaseUrl}/api/accessories");

            if (response.IsSuccessStatusCode)
            {
                return await response.Content.ReadAsStringAsync();
            }
            throw new HttpRequestException("Failed to retrieve accessories.");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error fetching accessories list: {ex.Message}");
            throw;
        }
    }

    // Get accessory by unique ID method
    public async Task<string> GetAccessoryByUniqueIdAsync(string uniqueId)
    {
        try
        {
            await LoginIntoHomebridgeAsync();
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _httpContextAccessor.HttpContext.Session.GetString("AccessToken"));
            var response = await _httpClient.GetAsync($"{_config.HomebridgeBaseUrl}/api/accessories/{uniqueId}");

            if (response.IsSuccessStatusCode)
            {
                return await response.Content.ReadAsStringAsync();
            }
            throw new HttpRequestException($"Failed to retrieve accessory with ID {uniqueId}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error fetching accessory: {ex.Message}");
            throw;
        }
    }

    // Get accessories layout method
    public async Task<string> GetAccessoriesLayoutAsync()
    {
        try
        {
            await LoginIntoHomebridgeAsync();
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _httpContextAccessor.HttpContext.Session.GetString("AccessToken"));
            var response = await _httpClient.GetAsync($"{_config.HomebridgeBaseUrl}/api/accessories/layout");

            if (response.IsSuccessStatusCode)
            {
                return await response.Content.ReadAsStringAsync();
            }
            throw new HttpRequestException("Failed to retrieve accessories layout.");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error fetching accessories layout: {ex.Message}");
            throw;
        }
    }

    // Set accessory characteristic method
    public async Task<bool> SetAccessoryCharacteristicAsync(string uniqueId, CharacteristicObject characteristicObject)
    {
        try
        {
            await LoginIntoHomebridgeAsync();
            _httpClient.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", _httpContextAccessor.HttpContext.Session.GetString("AccessToken"));

            var response = await _httpClient.PutAsJsonAsync($"{_config.HomebridgeBaseUrl}/api/accessories/{uniqueId}", characteristicObject);

            return response.IsSuccessStatusCode;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error setting accessory characteristic: {ex.Message}");
            throw;
        }
    }


    // Login method
    public async Task<bool> LoginIntoHomebridgeAsync()
    {
        var tokenExpiryString = _httpContextAccessor.HttpContext.Session.GetString("TokenExpiry");

        if (!string.IsNullOrEmpty(tokenExpiryString))
        {
            var tokenExpiry = DateTime.Parse(tokenExpiryString);

            if (DateTime.UtcNow.AddMinutes(15) < tokenExpiry)
            {
                return true;
            }

        }
        try
        {
            var loginData = new
            {
                username = _config.Homebridge.UserName,
                password = _config.Homebridge.Password
            };

            var content = new StringContent(JsonSerializer.Serialize(loginData), Encoding.UTF8, "application/json");
            var response = await _httpClient.PostAsync($"{_config.HomebridgeBaseUrl}/api/auth/login", content);

            if (response.IsSuccessStatusCode)
            {
                var responseData = await response.Content.ReadAsStringAsync();
                var jsonResponse = JsonSerializer.Deserialize<JsonElement>(responseData);

                _httpContextAccessor.HttpContext.Session.SetString("AccessToken", jsonResponse.GetProperty("access_token").GetString());

                _httpContextAccessor.HttpContext.Session.SetString("TokenExpiry", DateTime.UtcNow.AddMinutes(15).ToString("o"));

                _httpClient.DefaultRequestHeaders.Authorization =
                    new AuthenticationHeaderValue("Bearer", _httpContextAccessor.HttpContext.Session.GetString("AccessToken"));

                return true;
            }
            return false;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error during login: {ex.Message}");
            throw;
        }
    }
}
