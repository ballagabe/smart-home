namespace SmartHome.Server.Models
{
    public class AccessoryUpdate
    {
        public string UniqueId { get; set; }
        public CharacteristicObject CharacteristicObject { get; set; }
    }

    public class CharacteristicObject
    {
        public string characteristicType { get; set; }
        public int value { get; set; }
    }
}
