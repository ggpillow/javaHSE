class AlarmClock {
  constructor() {
    // Коллекция всех будильников
    this.alarmCollection = [];
    // id интервала, по умолчанию нет интервала
    this.intervalId = null;
  }

  addClock(time, callback) {
    if (!time || !callback) {
      throw new Error('Отсутствуют обязательные аргументы');
    }

    // Проверка на дубликат времени
    if (this.alarmCollection.some(alarm => alarm.time === time)) {
      console.warn('Уже присутствует звонок на это же время');
    }

    this.alarmCollection.push({
      time,
      callback,
      canCall: true, // можно ли сейчас вызывать этот будильник
    });
  }

  removeClock(time) {
    this.alarmCollection = this.alarmCollection.filter(
      alarm => alarm.time !== time
    );
  }

  getCurrentFormattedTime() {
    return new Date().toLocaleTimeString('ru-Ru', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  start() {
    // Если интервал уже запущен — ничего не делаем
    if (this.intervalId !== null) {
      return;
    }

    this.intervalId = setInterval(() => {
      const currentTime = this.getCurrentFormattedTime();

      this.alarmCollection.forEach(alarm => {
        if (alarm.canCall && alarm.time === currentTime) {
          alarm.canCall = false;
          alarm.callback();
        }
      });
    }, 1000);
  }

  stop() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  resetAllCalls() {
    this.alarmCollection.forEach(alarm => {
      alarm.canCall = true;
    });
  }

  clearAlarms() {
    this.stop();
    this.alarmCollection = [];
  }
}
