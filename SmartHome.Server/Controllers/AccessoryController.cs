using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace SmartHome.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccessoryController : ControllerBase
    {
        private readonly HomebridgeService _homebridgeService;

        public AccessoryController(HomebridgeService homebridgeService)
        {
            _homebridgeService = homebridgeService;
        }

        [HttpGet("accessories")]
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

        [HttpGet("accessories/layout")]
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

        [HttpGet("accessories/{uniqueId}")]
        public async Task<IActionResult> GetAccessory(string uniqueId)
        {
            try
            {
                var accessory = await _homebridgeService.GetAccessoryByUniqueIdAsync(uniqueId);
                return Ok(accessory);
            }
            catch
            {
                return StatusCode(500, $"Failed to retrieve accessory {uniqueId}.");
            }
        }

        [HttpPut("accessories/{uniqueId}")]
        public async Task<IActionResult> SetAccessoryCharacteristic(string uniqueId, [FromBody] object characteristic)
        {
            try
            {
                var success = await _homebridgeService.SetAccessoryCharacteristicAsync(uniqueId, characteristic);
                if (success)
                {
                    return Ok("Accessory updated successfully.");
                }
                return BadRequest("Failed to update accessory.");
            }
            catch
            {
                return StatusCode(500, $"Failed to update accessory {uniqueId}.");
            }
        }
    }
}
