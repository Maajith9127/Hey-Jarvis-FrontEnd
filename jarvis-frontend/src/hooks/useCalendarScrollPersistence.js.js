import { useEffect } from "react";

const useCalendarScrollPersistence = () => {
  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 10;

    const interval = setInterval(() => {
      // 👇 Dynamically find the vertical scroll container
      const scrollContainer = document.querySelector(
        ".fc-timegrid-body .fc-scroller" // this is usually the vertical scroller inside timeGrid view
      );

      if (scrollContainer) {
        const savedScroll = localStorage.getItem("calendarScrollY");
        if (savedScroll) {
          scrollContainer.scrollTop = parseInt(savedScroll);
          console.log("✅ Scroll restored:", savedScroll);
        }

        scrollContainer.addEventListener("scroll", () => {
          localStorage.setItem("calendarScrollY", scrollContainer.scrollTop);
        });

        clearInterval(interval);
      }

      attempts++;
      if (attempts > maxAttempts) {
        clearInterval(interval);
        console.warn("❌ Scroll container not found");
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);
};

export default useCalendarScrollPersistence;
