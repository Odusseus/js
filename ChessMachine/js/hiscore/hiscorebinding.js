var hiscoreViewModel = new HiscoreViewModel();
hiscoreViewModel.restore();
hiscoreViewModel.checkHiscore();

ko.applyBindings(hiscoreViewModel);
