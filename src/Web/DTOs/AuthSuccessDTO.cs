namespace Web.DTOs
{
    public class AuthSuccessDTO
    {
        public string Token { get; set; }

        public AuthSuccessDTO(string token)
        {
            Token = token;
        }
    }
}