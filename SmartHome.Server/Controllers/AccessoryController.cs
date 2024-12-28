using Microsoft.AspNetCore.Mvc;
using SmartHome.Server.Models;

[Route("api/accessories")]
[ApiController]
public class AccessoryController : ControllerBase
{
    private readonly HomebridgeService _homebridgeService;

    public AccessoryController(HomebridgeService homebridgeService)
    {
        _homebridgeService = homebridgeService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAccessoriesList()
    {
        try
        {
            var accessories = await _homebridgeService.GetAccessoriesListAsync();
            return Ok(accessories);
        }
        catch
        {
            return StatusCode(500, "Failed to retrieve accessories.");
        }
    }

    [HttpGet("layouts")]
    public async Task<IActionResult> GetAccessoriesLayoutList()
    {
        try
        {
            var layouts = await _homebridgeService.GetAccessoriesLayoutAsync();
            return Ok(layouts);
        }
        catch
        {
            return StatusCode(500, "Failed to retrieve layouts.");
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetAccessory(string id)
    {
        try
        {
            var accessory = await _homebridgeService.GetAccessoryByUniqueIdAsync(id);
            return Ok(accessory);
        }
        catch
        {
            return StatusCode(500, $"Failed to retrieve accessory {id}.");
        }
    }

    [HttpPut("{id}/characteristics")]
    public async Task<IActionResult> UpdateAccessoryCharacteristic(string id, [FromBody] AccessoryUpdate accessory)
    {
        try
        {
            var success = await _homebridgeService.SetAccessoryCharacteristicAsync(id, accessory.CharacteristicObject);
            if (success)
            {
                return Ok("Accessory updated successfully.");
            }
            return BadRequest("Failed to update accessory.");
        }
        catch
        {
            return StatusCode(500, $"Failed to update accessory {id}.");
        }
    }
}
