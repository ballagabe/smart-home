using Microsoft.AspNetCore.Mvc;

namespace SmartHome.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        [HttpGet]
        public ActionResult<string> Get()
        {
            return Ok("Gabor");
        }
    }
}
