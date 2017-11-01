let sn = $('.dse');
function ajax_bz(w, url) {
	w.submit(function (e) {
		var errors = 0;
		var validate = function validate(el) {
			el.map(function () {
				if (!$(this).val()) {
					errors++;
				}
			});
		};
		var error = function error(string) {
			if ($('.err-message').length) {
				$('.err-message span').html('' + string);
			} else {
				w.append('<div class="column-12 err-message">\n\t\t\t\t<span class="mkr">' + string + '</span></div>');
			};
		};
		validate($('input:text'));
		validate($('input:password'));
		if (errors > 0) {
			e.preventDefault();
			error('All field is required');
		} else {
			w.find(':submit').attr('disabled', 'disabled');
			e.preventDefault();
			$.ajax({
				url: url,
				method: 'POST',
				data: w.serialize(),
				success: function success(res) {
					if (res.error) {
						error('' + res.err_message);
					}
					if (res.redirect) {
						window.location.href = res.redirect_url;
					}
					w.find(':submit').removeAttr('disabled');
				}
			});
		}
	});
};
ajax_bz(sn,'/ajax/accounts');