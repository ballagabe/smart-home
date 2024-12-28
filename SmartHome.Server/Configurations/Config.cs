namespace SmartHome.Server.Model
{
    public class Config
    {
        public string HomebridgeBaseUrl { get; set; }
        public HomebridgeAuth Homebridge { get; set; }
        public GoogleAuth Google { get; set; }
    }

    public class HomebridgeAuth
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }

    public class GoogleAuth
    {
        public string ClientId { get; set; }
        public string ClientSecret { get; set; }
    }
}
