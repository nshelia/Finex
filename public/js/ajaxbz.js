module.exports =  function ajax_bz(w,url) {
	w.submit(e => {
		let errors = 0;
		const validate = el => {
			el.map(function(){
		         if(!$(this).val()) {
		            errors++;
		        }
		    });
		}
		const error = string => {
			if ($('.err-message').length) {
				$('.err-message span').html(`${string}`);
			} else {
				w.append(`<div class="column-12 err-message">
				<span class="mkr">${string}</span></div>`);
			};
		}
		validate($('input:text'));
		validate($('input:password'));
		if (errors > 0) {
			e.preventDefault();
			error('All field is required');
		} else {
			w.find(':submit').attr( 'disabled','disabled' );
			e.preventDefault();
			$.ajax({
				url,
				method: 'POST',
				data: w.serialize(),
				success: (res) => {
					if (res.error) {
						error(`${res.err_message}`);
					}
					if (res.redirect) {
						w.find(':submit').val('Redirecting...');
						window.location.href = res.redirect_url;
					}
					w.find(':submit').removeAttr('disabled')
				}
			})
		}
	})
}

