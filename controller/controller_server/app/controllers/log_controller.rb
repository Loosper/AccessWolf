class LogController < ApplicationController

  # POST /logs.json
  def create
    json = JSON.parse request.body.read

    # @student = Student.where(:uid => json["uid"]).first;
    # @student = "blabla"

    if @student.nil?
      head 401
    else
      head 200
    end

  end
end
