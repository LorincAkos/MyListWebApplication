namespace MyListWebApplication.Models.DTOs
{
    public class AnimeDto
    {
        public string Id { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public double Score { get; set; }
        public int Episode { get; set; }
        public bool IsFinished { get; set; }
    }
}
